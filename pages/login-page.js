const { expect } = require('@playwright/test');

export class LoginPage {

    constructor(page) {
        this.page = page;
    }

    async go() {
        await this.page.goto('https://login-app-qacademy.vercel.app/');
        await expect(this.page).toHaveURL(/.*qacademy/);
        await expect(this.page).toHaveTitle(/Login/);
        
        const getTitle = this.page.locator('.App-header p');
        await expect(getTitle).toHaveText('Login');
    }

    async login(user, password) {
        const getUser = this.page.locator('input[id=user]');
        const getPass = this.page.locator('input[id=pass]');
        const getEntrance = this.page.locator('button >> text=Entrar');

        await expect(getUser).toHaveAttribute('type', 'text');
        await expect(getPass).toHaveAttribute('type', 'password');
        await expect(getEntrance).toHaveAttribute('type', 'button');
      

        await getUser.fill(user);
        await getPass.fill(password);
        await getEntrance.click();
    }

    async validateLoginSuccess(message) {
        const getMessageOk = this.page.locator('h2[class=swal2-title]');
        const getMessageComplement = this.page.locator('#swal2-html-container');
        
        await expect(getMessageOk).toHaveText('Tudo certo!');
        await expect(getMessageComplement).toHaveText(message);
    }

    async validateLoginFail(message) {
        const getMessageError = this.page.locator('div[role=status]')
        await expect(getMessageError).toHaveText(message);
    }
}