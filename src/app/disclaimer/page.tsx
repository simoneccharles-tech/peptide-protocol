export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="font-display text-3xl font-semibold mb-6">Research Disclaimer</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground">
            The information provided on this website is for educational and research purposes only. 
            It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p className="text-muted-foreground mt-4">
            Always seek the advice of your physician or other qualified health provider with any questions 
            you may have regarding a medical condition.
          </p>
          <p className="text-muted-foreground mt-4">
            The Peptide Protocol does not endorse or guarantee any specific treatment, product, or protocol 
            mentioned on this site.
          </p>
        </div>
      </div>
    </div>
  )
}
