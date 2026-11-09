import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class BookingElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getTituloPrincipal(): Locator {
    return this.page.getByRole('heading', {
      level: 1,
      name: 'Encontre sua próxima estadia'
    });
  }

  getCampoDestino(): Locator {
    return this.page.getByRole('combobox', { name: 'Inserir destino' });
  }

  getBotaoDatas(): Locator {
    return this.page.getByRole('button', { name: /Selecionar datas/ });
  }

  getBotaoPesquisar(): Locator {
    return this.page.getByRole('button', { name: 'Pesquisar', exact: true });
  }

  getSugestaoDestino(destino: string): Locator {
    return this.page.getByRole('option').filter({ hasText: destino }).first();
  }

  getTituloResultado(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  getMenuVoos(): Locator {
    return this.page.getByRole('menuitem', { name: 'Voos' });
  }

  getBotaoFecharLogin(): Locator {
    return this.page.getByRole('button', { name: /^Ignorar informações/ });
  }

  getBotaoRecusarCookies(): Locator {
    return this.page.getByRole('button', { name: 'Recusar' });
  }
}
