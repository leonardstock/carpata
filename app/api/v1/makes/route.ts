import { NextResponse } from "next/server";
import vehicles from "@/public/vehicles.json";

export async function GET() {
    try {
        const uniqueMakes = [...new Set(vehicles.map((item) => item.make))];
        uniqueMakes.sort();

        const makesWithId = uniqueMakes.map((make, index) => {
            return { value: index, label: make };
        });

        return NextResponse.json(makesWithId);
    } catch (error) {
        if (error instanceof Error) {
            return new NextResponse("Error fetching makes", { status: 500 });
        }
    }
}
