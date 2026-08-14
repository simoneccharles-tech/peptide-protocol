export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="font-display text-3xl font-semibold mb-6">Terms of Service</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground">
            By using The Peptide Protocol website and services, you agree to the following terms:
          </p>
          <p className="text-muted-foreground mt-4">
            1. All information provided is for educational purposes only.
          </p>
          <p className="text-muted-foreground mt-4">
            2. Peptides are prescribed and supervised by qualified healthcare professionals.
          </p>
          <p className="text-muted-foreground mt-4">
            3. Individual results may vary.
          </p>
          <p className="text-muted-foreground mt-4">
            4. We reserve the right to modify these terms at any time.
          </p>
        </div>
      </div>
    </div>
  )
}
