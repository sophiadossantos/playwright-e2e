import { Page, expect } from '@playwright/test';
import BookingElements from '../elements/BookingElements';
import BasePage from './BasePage';

export default class BookingPage extends BasePage {
  readonly bookingElements: BookingElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.bookingElements = new BookingElements(page);
  }

  async fecharPopupsSeAparecerem(): Promise<void> {
    await this.page.addLocatorHandler(
      this.bookingElements.getBotaoFecharLogin(),
      async () => {
        await this.bookingElements.getBotaoFecharLogin().click();
      }
    );
    await this.page.addLocatorHandler(
      this.bookingElements.getBotaoRecusarCookies(),
      async () => {
        await this.bookingElements.getBotaoRecusarCookies().click();
      }
    );
  }

  async validarPaginaInicial(): Promise<void> {
    await expect(this.page).toHaveTitle(/Booking\.com/);
    await expect(this.bookingElements.getTituloPrincipal()).toBeVisible();
    await expect(this.bookingElements.getCampoDestino()).toBeVisible();
    await expect(this.bookingElements.getBotaoDatas()).toBeVisible();
    await expect(this.bookingElements.getBotaoPesquisar()).toBeEnabled();
  }

  async pesquisarDestino(destino: string): Promise<void> {
    const campoDestino = this.bookingElements.getCampoDestino();
    const sugestao = this.bookingElements.getSugestaoDestino(destino);

    await expect(async () => {
      await campoDestino.clear();
      await campoDestino.pressSequentially(destino);
      await expect(sugestao).toBeVisible({ timeout: 5000 });
    }).toPass({ timeout: 30000 });

    await sugestao.click();
    await this.bookingElements.getBotaoPesquisar().click();
  }

  async validarResultadoDestino(destino: string): Promise<void> {
    await expect(this.page).not.toHaveURL(/index\.pt-br\.html/);
    await expect(this.bookingElements.getTituloResultado()).toContainText(
      destino
    );
  }

  async acessarVoos(): Promise<void> {
    await this.bookingElements.getMenuVoos().click();
  }

  async validarPaginaVoos(): Promise<void> {
    await expect(this.page).toHaveURL(/\/flights\//);
    await expect(this.page).toHaveTitle(/voos/i);
  }
}
