// @ts-check
const { test } = require('@playwright/test');

import { LoginPage } from '../pages/login-page';

test('Deve logar com sucesso', async ({ page }) => {

  const loginPage = new LoginPage(page)

  await loginPage.go()
  await loginPage.login("qa", "cademy")
  await loginPage.validateLoginSuccess('Sua credenciais são validas :)')
})

test('senha incorreta', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.go()
  await loginPage.login("qa", "teste@123")
  await loginPage.validateLoginFail('Oops! Credenciais inválidas :(')
})

test('user incorreto', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.go()
  await loginPage.login("teste", "cademy")
  await loginPage.validateLoginFail('Oops! Credenciais inválidas :(')
})

test('usuário obrigatório', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.go()
  await loginPage.login("", "cademy")
  await loginPage.validateLoginFail('Informe o seu nome de usuário!')
})

test('senha obrigatória', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await loginPage.go()
  await loginPage.login("qa", "")
  await loginPage.validateLoginFail('Informe a sua senha secreta!')
})