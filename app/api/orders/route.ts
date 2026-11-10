import { NextRequest, NextResponse } from "next/server";
import { createOrder, getOrderByNumber, getShippingZones } from "@/lib/db";
import { CreateOrderInput } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateOrderInput;

    if (!body.customerName || !body.customerPhone || !body.deliveryAddress || !body.deliveryZoneCode) {
      return NextResponse.json(
        { error: "Veuillez renseigner votre nom, téléphone, adresse et zone de livraison." },
        { status: 400 }
      );
    }

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Votre panier est vide." },
        { status: 400 }
      );
    }

    const order = await createOrder(body);

    return NextResponse.json({
      success: true,
      orderNumber: order.order_number,
      order,
    });
  } catch (error: any) {
    console.error("Erreur lors de la création de la commande :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'enregistrement de votre commande." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderNumber = searchParams.get("orderNumber");

    if (!orderNumber) {
      const zones = await getShippingZones();
      return NextResponse.json({ zones });
    }

    const order = await getOrderByNumber(orderNumber);
    if (!order) {
      return NextResponse.json({ error: "Commande introuvable" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error: any) {
    console.error("Erreur lors de la récupération de la commande :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

