/**
 * Hex/ASCII Converter
 * Convert between hexadecimal and ASCII
 *
 * Online tool: https://devtools.at/tools/hex-ascii
 *
 * @packageDocumentation
 */

function hexToAscii(hex: string): string {
  // Remove common prefixes and separators
  const cleaned = hex
    .replace(/^0x/gi, "") // Remove 0x prefix
    .replace(/\\x/g, "") // Remove \x prefix
    .replace(/[:\s,\-]/g, ""); // Remove colons, spaces, commas, hyphens

  // Validate hex characters
  if (!/^[0-9A-Fa-f]*$/.test(cleaned)) {
    throw new Error("Invalid hexadecimal characters");
  }

  // Must be even length (each byte is 2 hex chars)
  if (cleaned.length % 2 !== 0) {
    throw new Error("Hex string must have even length");
  }

  let result = "";
  for (let i = 0; i < cleaned.length; i += 2) {
    const hexByte = cleaned.substring(i, i + 2);
    const charCode = parseInt(hexByte, 16);

    // Only allow printable ASCII and common whitespace
    if ((charCode >= 32 && charCode <= 126) || charCode === 9 || charCode === 10 || charCode === 13) {
      result += String.fromCharCode(charCode);
    } else {
      result += `[${hexByte}]`; // Show non-printable as hex in brackets
    }
  }

  return result;
}

function asciiToHex(text: string, format: "plain" | "0x" | "colon" | "space"): string {
  const hexArray: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const hex = text.charCodeAt(i).toString(16).padStart(2, "0");
    hexArray.push(hex);
  }

  switch (format) {
    case "0x":
      return hexArray.map(h => `0x${h}`).join(" ");
    case "colon":
      return hexArray.join(":");
    case "space":
      return hexArray.join(" ");
    case "plain":
    default:
      return hexArray.join("");
  }
}

// Export for convenience
export default { encode, decode };
