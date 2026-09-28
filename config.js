// ============================================================
// NEAR MINI MART — central configuration
// Edit this file to change business details. Nothing else needs touching.
// Values marked PLACEHOLDER have NOT been provided by the customer yet.
// ============================================================
const CONFIG = {
  businessName: "NEAR MINI MART",

  // PLACEHOLDER — digits only, country code first, no "+" or spaces. e.g. "971501234567"
  whatsappNumber: "971569625552",

  currency: "AED",

  // PLACEHOLDERS — shown in the Contact section until replaced
  contact: {
    phoneDisplay: "+971 5696255527",
    address: "[Store address — to be added]",
    mapsLink: "" // paste the Google Maps link here; the button appears automatically
  },

  // Provided by the customer
  openingHours: "Open 24 Hours",
  deliveryTime: "15–30 Minutes",
  deliveryFeeLabel: "Free",          // shown in the WhatsApp message
  paymentLabel: "Cash on Delivery",
  deliveryClusters: ["U", "V", "W", "T", "S"], // JLT clusters with free delivery
  deliveryAreaName: "JLT"
};
