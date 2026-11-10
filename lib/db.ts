import { PGlite } from "@electric-sql/pglite";
import { Pool } from "pg";
import fs from "fs";
import path from "path";
import { INITIAL_PRODUCTS, INITIAL_SHIPPING_ZONES, INITIAL_REVIEWS } from "./data";
import { Product, ShippingZone, CustomerReview, CreateOrderInput, OrderRecord } from "./types";
import { generateOrderNumber } from "./format";

let pgPool: Pool | null = null;
let pgliteInstance: PGlite | null = null;
let initPromise: Promise<void> | null = null;

// Vérifie si les identifiants Supabase REST sont présents
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const useSupabaseRest = Boolean(supabaseUrl && supabaseKey);

function getSupabaseHeaders() {
  return {
    apikey: supabaseKey!,
    Authorization: `Bearer ${supabaseKey!}`,
    "Content-Type": "application/json",
  };
}

async function getClient() {
  if (process.env.DATABASE_URL) {
    if (!pgPool) {
      const isRemote =
        !process.env.DATABASE_URL.includes("localhost") &&
        !process.env.DATABASE_URL.includes("127.0.0.1");

      pgPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: isRemote ? { rejectUnauthorized: false } : undefined,
      });
    }
    return {
      type: "pg" as const,
      exec: async (text: string) => {
        await pgPool!.query(text);
      },
      query: async (text: string, params?: any[]) => {
        const res = await pgPool!.query(text, params);
        return { rows: res.rows };
      },
    };
  }

  if (!pgliteInstance) {
    const dataDir = path.join(process.cwd(), ".data", "pglite");
    try {
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      pgliteInstance = new PGlite(dataDir);
    } catch {
      // Memory fallback if directory access is constrained
      pgliteInstance = new PGlite();
    }
  }

  return {
    type: "pglite" as const,
    exec: async (text: string) => {
      await pgliteInstance!.exec(text);
    },
    query: async (text: string, params?: any[]) => {
      const res = await pgliteInstance!.query(text, params);
      return { rows: res.rows as any[] };
    },
  };
}

export async function initDatabase() {
  if (useSupabaseRest) {
    // Avec Supabase REST, le schéma est exécuté dans l'éditeur SQL de Supabase
    return;
  }

  if (initPromise) return initPromise;

  initPromise = (async () => {
    const db = await getClient();

    const schemaSql = `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(120) UNIQUE NOT NULL,
        name VARCHAR(160) NOT NULL,
        collection VARCHAR(120) NOT NULL DEFAULT 'Collection Lenkā',
        category VARCHAR(60) NOT NULL,
        price_mga INTEGER NOT NULL,
        subtitle TEXT NOT NULL,
        description TEXT NOT NULL,
        material_details TEXT NOT NULL,
        care_instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
        dimensions VARCHAR(120) NOT NULL,
        weaving_hours INTEGER NOT NULL DEFAULT 24,
        origin_region VARCHAR(120) NOT NULL DEFAULT 'Antananarivo, Madagascar',
        images JSONB NOT NULL DEFAULT '[]'::jsonb,
        colors JSONB NOT NULL DEFAULT '[]'::jsonb,
        sizes JSONB NOT NULL DEFAULT '[]'::jsonb,
        featured BOOLEAN NOT NULL DEFAULT false,
        in_stock BOOLEAN NOT NULL DEFAULT true,
        handles TEXT,
        interior TEXT,
        production_delay VARCHAR(120),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      ALTER TABLE products ADD COLUMN IF NOT EXISTS handles TEXT;
      ALTER TABLE products ADD COLUMN IF NOT EXISTS interior TEXT;
      ALTER TABLE products ADD COLUMN IF NOT EXISTS production_delay VARCHAR(120);

      CREATE TABLE IF NOT EXISTS shipping_zones (
        id SERIAL PRIMARY KEY,
        code VARCHAR(60) UNIQUE NOT NULL,
        name VARCHAR(140) NOT NULL,
        fee_mga INTEGER NOT NULL,
        delivery_estimate VARCHAR(140) NOT NULL,
        description TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS customer_reviews (
        id SERIAL PRIMARY KEY,
        author_name VARCHAR(120) NOT NULL,
        location VARCHAR(120) NOT NULL,
        product_name VARCHAR(140) NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT NOT NULL,
        verified_purchase BOOLEAN NOT NULL DEFAULT true,
        review_date VARCHAR(60) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(40) UNIQUE NOT NULL,
        customer_name VARCHAR(160) NOT NULL,
        customer_phone VARCHAR(60) NOT NULL,
        customer_email VARCHAR(160),
        delivery_zone_code VARCHAR(60) NOT NULL,
        delivery_address TEXT NOT NULL,
        delivery_city VARCHAR(120) NOT NULL,
        delivery_notes TEXT,
        payment_method VARCHAR(60) NOT NULL,
        payment_phone VARCHAR(60),
        payment_reference VARCHAR(100),
        subtotal_mga INTEGER NOT NULL,
        shipping_fee_mga INTEGER NOT NULL,
        total_mga INTEGER NOT NULL,
        items JSONB NOT NULL,
        status VARCHAR(40) NOT NULL DEFAULT 'confirmée',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await db.exec(schemaSql);

    for (const p of INITIAL_PRODUCTS) {
      await db.query(
        `INSERT INTO products (
          slug, name, collection, category, price_mga, subtitle, description,
          material_details, care_instructions, dimensions, weaving_hours, origin_region,
          images, colors, sizes, featured, in_stock
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        ON CONFLICT (slug) DO NOTHING`,
        [
          p.slug,
          p.name,
          p.collection,
          p.category,
          p.price_mga,
          p.subtitle,
          p.description,
          p.material_details,
          JSON.stringify(p.care_instructions),
          p.dimensions,
          p.weaving_hours,
          p.origin_region,
          JSON.stringify(p.images),
          JSON.stringify(p.colors),
          JSON.stringify(p.sizes),
          p.featured,
          p.in_stock,
        ]
      );
    }

    for (const z of INITIAL_SHIPPING_ZONES) {
      await db.query(
        `INSERT INTO shipping_zones (code, name, fee_mga, delivery_estimate, description)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (code) DO NOTHING`,
        [z.code, z.name, z.fee_mga, z.delivery_estimate, z.description]
      );
    }

    const reviewsCount = await db.query("SELECT COUNT(*) as count FROM customer_reviews");
    if (parseInt(reviewsCount.rows[0]?.count || "0", 10) === 0) {
      for (const r of INITIAL_REVIEWS) {
        await db.query(
          `INSERT INTO customer_reviews (author_name, location, product_name, rating, comment, verified_purchase, review_date)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [r.author_name, r.location, r.product_name, r.rating, r.comment, r.verified_purchase, r.review_date]
        );
      }
    }
  })();

  return initPromise;
}

export async function getProducts(options?: { category?: string; featured?: boolean }): Promise<Product[]> {
  if (useSupabaseRest) {
    try {
      let endpoint = `${supabaseUrl}/rest/v1/products?select=*&in_stock=eq.true&order=id.asc`;
      if (options?.category && options.category !== "Tous") {
        endpoint += `&category=eq.${encodeURIComponent(options.category)}`;
      }
      if (options?.featured) {
        endpoint += `&featured=eq.true`;
      }

      const res = await fetch(endpoint, {
        headers: getSupabaseHeaders(),
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows)) {
          return rows.map(mapProductRow);
        }
      }
    } catch (e) {
      console.warn("Connexion Supabase REST non disponible, bascule sur les données locales :", e);
    }
  }

  await initDatabase();
  const db = await getClient();

  let queryText = "SELECT * FROM products WHERE in_stock = true";
  const params: any[] = [];

  if (options?.category && options.category !== "Tous") {
    params.push(options.category);
    queryText += ` AND category = $${params.length}`;
  }

  if (options?.featured) {
    queryText += ` AND featured = true`;
  }

  queryText += " ORDER BY id ASC";

  const { rows } = await db.query(queryText, params);
  return rows.map(mapProductRow);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (useSupabaseRest) {
    try {
      const endpoint = `${supabaseUrl}/rest/v1/products?select=*&slug=eq.${encodeURIComponent(slug)}&limit=1`;
      const res = await fetch(endpoint, {
        headers: getSupabaseHeaders(),
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          return mapProductRow(rows[0]);
        }
      }
    } catch (e) {
      console.warn("Connexion Supabase REST non disponible pour slug, bascule locale :", e);
    }
  }

  await initDatabase();
  const db = await getClient();
  const { rows } = await db.query("SELECT * FROM products WHERE slug = $1 LIMIT 1", [slug]);
  if (!rows.length) return null;
  return mapProductRow(rows[0]);
}

export async function getShippingZones(): Promise<ShippingZone[]> {
  if (useSupabaseRest) {
    try {
      const endpoint = `${supabaseUrl}/rest/v1/shipping_zones?select=*&order=id.asc`;
      const res = await fetch(endpoint, {
        headers: getSupabaseHeaders(),
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          return rows.map((r: any) => ({
            id: r.id,
            code: r.code,
            name: r.name,
            fee_mga: Number(r.fee_mga),
            delivery_estimate: r.delivery_estimate,
            description: r.description,
          }));
        }
      }
    } catch (e) {
      console.warn("Connexion Supabase REST shipping_zones non disponible, bascule locale :", e);
    }
  }

  await initDatabase();
  const db = await getClient();
  const { rows } = await db.query("SELECT * FROM shipping_zones ORDER BY id ASC");
  return rows.map((r: any) => ({
    id: r.id,
    code: r.code,
    name: r.name,
    fee_mga: Number(r.fee_mga),
    delivery_estimate: r.delivery_estimate,
    description: r.description,
  }));
}

export async function getCustomerReviews(): Promise<CustomerReview[]> {
  if (useSupabaseRest) {
    try {
      const endpoint = `${supabaseUrl}/rest/v1/customer_reviews?select=*&order=id.asc`;
      const res = await fetch(endpoint, {
        headers: getSupabaseHeaders(),
        next: { revalidate: 60 },
      });
      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          return rows.map((r: any) => ({
            id: r.id,
            author_name: r.author_name,
            location: r.location,
            product_name: r.product_name,
            rating: Number(r.rating),
            comment: r.comment,
            verified_purchase: Boolean(r.verified_purchase),
            review_date: r.review_date,
          }));
        }
      }
    } catch (e) {
      console.warn("Connexion Supabase REST reviews non disponible, bascule locale :", e);
    }
  }

  await initDatabase();
  const db = await getClient();
  const { rows } = await db.query("SELECT * FROM customer_reviews ORDER BY id ASC");
  return rows.map((r: any) => ({
    id: r.id,
    author_name: r.author_name,
    location: r.location,
    product_name: r.product_name,
    rating: Number(r.rating),
    comment: r.comment,
    verified_purchase: Boolean(r.verified_purchase),
    review_date: r.review_date,
  }));
}

export async function createOrder(input: CreateOrderInput): Promise<OrderRecord> {
  const zones = await getShippingZones();
  const zone = zones.find((z) => z.code === input.deliveryZoneCode) || zones[0];
  const shippingFeeMga = zone.fee_mga;

  const subtotalMga = input.items.reduce(
    (sum, item) => sum + item.unitPriceMga * item.quantity,
    0
  );
  const totalMga = subtotalMga + shippingFeeMga;
  const orderNumber = generateOrderNumber();

  if (useSupabaseRest) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/orders`, {
        method: "POST",
        headers: {
          ...getSupabaseHeaders(),
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          order_number: orderNumber,
          customer_name: input.customerName,
          customer_phone: input.customerPhone,
          customer_email: input.customerEmail || null,
          delivery_zone_code: input.deliveryZoneCode,
          delivery_address: input.deliveryAddress,
          delivery_city: input.deliveryCity,
          delivery_notes: input.deliveryNotes || null,
          payment_method: input.paymentMethod,
          payment_phone: input.paymentPhone || null,
          payment_reference: input.paymentReference || null,
          subtotal_mga: subtotalMga,
          shipping_fee_mga: shippingFeeMga,
          total_mga: totalMga,
          items: input.items,
          status: "confirmée",
        }),
      });

      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          return mapOrderRow(rows[0]);
        }
      }
    } catch (e) {
      console.warn("Enregistrement commande via Supabase REST échoué, bascule locale :", e);
    }
  }

  await initDatabase();
  const db = await getClient();

  const queryText = `
    INSERT INTO orders (
      order_number, customer_name, customer_phone, customer_email,
      delivery_zone_code, delivery_address, delivery_city, delivery_notes,
      payment_method, payment_phone, payment_reference,
      subtotal_mga, shipping_fee_mga, total_mga, items, status
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
    ) RETURNING *
  `;

  const values = [
    orderNumber,
    input.customerName,
    input.customerPhone,
    input.customerEmail || null,
    input.deliveryZoneCode,
    input.deliveryAddress,
    input.deliveryCity,
    input.deliveryNotes || null,
    input.paymentMethod,
    input.paymentPhone || null,
    input.paymentReference || null,
    subtotalMga,
    shippingFeeMga,
    totalMga,
    JSON.stringify(input.items),
    "confirmée",
  ];

  const { rows } = await db.query(queryText, values);
  return mapOrderRow(rows[0]);
}

export async function getOrderByNumber(orderNumber: string): Promise<OrderRecord | null> {
  if (useSupabaseRest) {
    try {
      const endpoint = `${supabaseUrl}/rest/v1/orders?select=*&order_number=eq.${encodeURIComponent(orderNumber)}&limit=1`;
      const res = await fetch(endpoint, {
        headers: getSupabaseHeaders(),
        cache: "no-store",
      });
      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          return mapOrderRow(rows[0]);
        }
      }
    } catch (e) {
      console.warn("Recherche commande via Supabase REST échouée, bascule locale :", e);
    }
  }

  await initDatabase();
  const db = await getClient();
  const { rows } = await db.query("SELECT * FROM orders WHERE order_number = $1 LIMIT 1", [orderNumber]);
  if (!rows.length) return null;
  return mapOrderRow(rows[0]);
}

function resolveProductImages(slug: string, rawImages: unknown): string[] {
  const dbImages: string[] =
    typeof rawImages === "string"
      ? JSON.parse(rawImages)
      : Array.isArray(rawImages)
        ? rawImages
        : [];

  const publicDir = path.join(process.cwd(), "public");
  const extensions = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"];
  const candidates = new Set<string>();

  if (slug) {
    for (const ext of extensions) {
      candidates.add(`/products/${slug}${ext}`);
    }
    for (let i = 1; i <= 4; i++) {
      for (const ext of extensions) {
        candidates.add(`/products/${slug}-${i}${ext}`);
      }
    }
  }

  for (const img of dbImages) {
    if (typeof img === "string" && img.trim()) {
      const trimmed = img.trim();
      candidates.add(trimmed);
      const baseWithoutExt = trimmed.replace(/\.(jpe?g|png|webp)$/i, "");
      if (baseWithoutExt !== trimmed) {
        for (const ext of extensions) {
          candidates.add(`${baseWithoutExt}${ext}`);
        }
      }
    }
  }

  const existing: string[] = [];
  const seenBase = new Set<string>();

  for (const relPath of candidates) {
    if (relPath.startsWith("http://") || relPath.startsWith("https://")) {
      existing.push(relPath);
      continue;
    }
    const cleanRel = relPath.startsWith("/") ? relPath.slice(1) : relPath;
    const baseKey = cleanRel.replace(/\.(jpe?g|png|webp)$/i, "").toLowerCase();
    if (seenBase.has(baseKey)) continue;

    const fullPath = path.join(publicDir, cleanRel);
    try {
      if (fs.existsSync(fullPath)) {
        seenBase.add(baseKey);
        existing.push(relPath.startsWith("/") ? relPath : `/${relPath}`);
      }
    } catch {
      // ignore fs errors
    }
  }

  return existing.slice(0, 4);
}

function mapProductRow(r: any): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    collection: r.collection || "Collection Lenkā",
    category: r.category,
    price_mga: Number(r.price_mga),
    subtitle: r.subtitle || "",
    description: r.description || "",
    material_details: r.material_details || "100% Raphia naturel de Madagascar",
    care_instructions: typeof r.care_instructions === "string" ? JSON.parse(r.care_instructions) : r.care_instructions || [],
    dimensions: r.dimensions || "",
    weaving_hours: Number(r.weaving_hours || 24),
    origin_region: r.origin_region || "Antananarivo, Madagascar",
    images: resolveProductImages(r.slug, r.images),
    colors: typeof r.colors === "string" ? JSON.parse(r.colors) : r.colors || [],
    sizes: typeof r.sizes === "string" ? JSON.parse(r.sizes) : r.sizes || [],
    featured: Boolean(r.featured),
    in_stock: Boolean(r.in_stock),
    handles: r.handles || undefined,
    interior: r.interior || undefined,
    production_delay: r.production_delay || undefined,
  };
}

function mapOrderRow(r: any): OrderRecord {
  return {
    id: r.id,
    order_number: r.order_number,
    customer_name: r.customer_name,
    customer_phone: r.customer_phone,
    customer_email: r.customer_email,
    delivery_zone_code: r.delivery_zone_code,
    delivery_address: r.delivery_address,
    delivery_city: r.delivery_city,
    delivery_notes: r.delivery_notes,
    payment_method: r.payment_method,
    payment_phone: r.payment_phone,
    payment_reference: r.payment_reference,
    subtotal_mga: Number(r.subtotal_mga),
    shipping_fee_mga: Number(r.shipping_fee_mga),
    total_mga: Number(r.total_mga),
    items: typeof r.items === "string" ? JSON.parse(r.items) : r.items || [],
    status: r.status,
    created_at: String(r.created_at),
  };
}
