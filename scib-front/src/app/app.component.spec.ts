import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  it('should create the app component', async () => {
    const { fixture } = await render(AppComponent, {
      imports: [HeaderComponent, RouterOutlet],
    });
    const appElement = fixture.nativeElement;
    expect(appElement).toBeTruthy();
  });

  it('should have the correct title', async () => {
    const { fixture } = await render(AppComponent, {
      imports: [HeaderComponent, RouterOutlet],
    });
    const appComponent = fixture.componentInstance;
    expect(appComponent.title).toBe('scib-techical-test');
  });

  it('should render the header component', async () => {
    await render(AppComponent, {
      imports: [HeaderComponent, RouterOutlet],
    });
    const headerElement = screen.queryBySelector('app-header');
    expect(headerElement).toBeTruthy();
  });
});
