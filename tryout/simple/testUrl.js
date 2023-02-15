// url => for URL resolution and parsing
const url = new URL("/catalog?page=4#Pricing", "http://localhost:3000")

// console.log(url)

console.log(url.pathname)
console.log(url.searchParams.get("page"))