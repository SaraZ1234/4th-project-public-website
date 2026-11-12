import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="section"><div className="container-x text-center">
      <h1>We can't find that page</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">The link may be old or mistyped. Go back to the home page or pick a business.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Button href="/">Go to Home</Button><Button href="/businesses" variant="secondary">Our Businesses</Button></div>
    </div></div>
  );
}
