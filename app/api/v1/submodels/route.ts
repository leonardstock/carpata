import { NextRequest, NextResponse } from "next/server";
import vehicles from "@/public/vehicles.json";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const make = searchParams.get("make");
        const model = searchParams.get("model");

        const filteredVehicles = vehicles.filter(
            (vehicle) => vehicle.model === model && vehicle.make === make
        );

        const filteredModels = filteredVehicles.map((vehicle, index) => {
            return { id: index, model: vehicle.submodel ?? "NONE" };
        });

        return NextResponse.json(filteredModels);
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse("Error fetching submodels", {
                status: 500,
            });
        }
    }
}
