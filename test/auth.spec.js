import { Builder, By, until } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'
import { expect } from 'chai'

describe('AUTHENTICATION & AUTHORIZATION', function () {
  this.timeout(30000)
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').setChromeOptions(new Options()).build()
  })

  //   after(async function() {
  //     await driver.quit();
  //   });

  it('should login successfully', async function () {
    await driver.get('https://clientbase.pasv.us/v6/user/login')

    await driver.findElement(By.name('email')).sendKeys('test@gmail.com')
    await driver.findElement(By.name('password')).sendKeys('12345')
    await driver.findElement(By.className('btn-sign btn btn-primary')).click()

    await driver.wait(until.elementLocated(By.className('dropdown-toggle nav-link')), 10000)
    let userName = await driver.findElement(By.className('dropdown-toggle nav-link')).getText()
    expect(userName.includes('Test Test'))
  })
})
