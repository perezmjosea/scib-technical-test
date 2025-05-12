import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home.component';
import '@testing-library/jest-dom';
import { FormComponent } from '../../components/form/form.component';
import { TableComponent } from '../../components/table/table.component';
import { MatGridListModule } from '@angular/material/grid-list';

describe('HomeComponent', () => {
  it('should create the HomeComponent', async () => {
    await render(HomeComponent, {
      imports: [MatGridListModule, FormComponent, TableComponent],
    });

    expect(screen.getByText('Formulario')).toBeInTheDocument();
    expect(screen.getByText('Persons')).toBeInTheDocument();
  });

  it('should contain form and table components', async () => {
    await render(HomeComponent, {
      imports: [MatGridListModule, FormComponent, TableComponent],
    });

    const formComponent = screen.queryByTestId('form-component');
    const tableComponent = screen.queryByTestId('table-component');

    expect(formComponent).toBeInTheDocument();
    expect(tableComponent).toBeInTheDocument();
  });
});
