import { NextRequest, NextResponse } from "next/server";
import vehicles from "@/public/vehicles.json";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const make = searchParams.get("make");

        const filteredVehicles = vehicles.filter(
            (vehicle) => vehicle.make === make
        );

        const uniqueModels = [
            ...new Set(filteredVehicles.map((item) => item.model)),
        ].sort();

        const filteredModels = uniqueModels.map((model, index) => {
            return { id: index, model: model };
        });

        return NextResponse.json(filteredModels);
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse("Error fetching models", { status: 500 });
        }
    }
}
