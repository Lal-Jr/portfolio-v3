import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = "image/png";

// Generate the icon
export default function Icon() {
    // Read the logo file
    const logoPath = join(process.cwd(), "public", "favicon.png");
    const logoData = readFileSync(logoPath);
    // Convert buffer to base64 for embedding
    const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: "transparent", // Keep background transparent
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={logoBase64}
                    alt="Icon"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
