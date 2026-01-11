import { Button } from '@patriksui/core';
import type { ButtonProps } from '@patriksui/types';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-foreground">PatrikSUI Playground</h1>
          <p className="text-muted-foreground">Test and explore @patriksui/core components</p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default" onClick={handleClick}>
              Default
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Disabled State</h2>
          <div className="flex flex-wrap gap-4">
            <Button disabled>Disabled Default</Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
