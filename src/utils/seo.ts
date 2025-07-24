export function getSeo({ title, description, ogImage, url }) {
  return {
    title: title ? `${title} | Periodismo Independiente Quintana Roo` : "Periodismo Independiente Quintana Roo",
    description: description || "Investigación periodística independiente y filtraciones en México y Quintana Roo.",
    ogTitle: title || "Periodismo Independiente Quintana Roo",
    ogDescription: description || "Investigación periodística independiente y filtraciones en México y Quintana Roo.",
    ogImage: ogImage || "/images/og-default.png",
    url: url || "https://yourdomain.com"
  };
}