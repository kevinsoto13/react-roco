import { test, expect } from '@playwright/test';

test('flujo completo de compra', async ({ page }) => {
  // 🏁 Abrir la app
  await page.goto('/');
  
  // 🛒 Agregar productos
  await page.getByRole('button', { name: /Add to cart/i }).nth(1).click();
  await page.getByRole('button', { name: /Add to cart/i }).nth(2).click();
  
  // 🔗 Ir al carrito
  await page.getByTestId('ShoppingCartIcon').click();
  
  // ⏳ Esperar que el carrito cargue
  await page.waitForSelector('text=Vaciar carrito', { timeout: 10000 });
  
  // ⚙️ Intentar ajustar cantidad si existe el botón
const minusButton = page.locator('button:has-text("-")').first();
if (await minusButton.count() > 0) {
  const isDisabled = await minusButton.isDisabled();
  if (!isDisabled) {
    await minusButton.click();
  } else {
    console.log('ℹ️ El botón "-" está deshabilitado, se omite clic.');
  }
} else {
  console.log('⚠️ No se encontró ningún botón "-" en el carrito.');
}


  // 🗑️ Vaciar carrito
  await page.getByRole('button', { name: /Vaciar carrito/i }).click();

  // 🧾 Volver a comprar algo
  await page.getByRole('link', { name: /Ropa/i }).click();
  await page.getByRole('button', { name: /Add to cart/i }).first().click();
  await page.getByTestId('ShoppingCartIcon').click();

  // 💳 Proceder al pago
  await page.getByRole('button', { name: /Proceder al pago/i }).click();
  await page.getByRole('textbox', { name: /Nombre completo/i }).fill('Kevin Soto');
  await page.getByRole('textbox', { name: /Email/i }).fill('kevin@email.com');
  await page.getByRole('textbox', { name: /Teléfono/i }).fill('099999999');
  await page.getByRole('button', { name: /Confirmar compra/i }).click();

  // ✅ Confirmar compra finalizada
// ✅ Confirmar compra finalizada
// ✅ Confirmar que el botón "Finalizar" está visible al final del flujo
await page.waitForSelector('button:has-text("Finalizar")', { timeout: 20000 });

// (opcional) Presionar el botón si querés cerrar el flujo completo
await page.getByRole('button', { name: 'Finalizar' }).click();

});
