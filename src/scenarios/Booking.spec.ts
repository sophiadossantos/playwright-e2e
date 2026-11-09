import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import BookingPage from '../support/pages/BookingPage';

test.describe('Booking.com', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let bookingPage: BookingPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.booking')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    bookingPage = new BookingPage(page);
    await bookingPage.fecharPopupsSeAparecerem();
    await page.goto(BASE_URL);
  });

  test('Deve exibir a página inicial com o formulário de busca', async () => {
    await bookingPage.validarPaginaInicial();
  });

  test('Deve pesquisar hospedagens em Florianópolis', async () => {
    await bookingPage.pesquisarDestino('Florianópolis');
    await bookingPage.validarResultadoDestino('Florianópolis');
  });

  test('Deve navegar para a página de voos pelo menu', async () => {
    await bookingPage.acessarVoos();
    await bookingPage.validarPaginaVoos();
  });
});
