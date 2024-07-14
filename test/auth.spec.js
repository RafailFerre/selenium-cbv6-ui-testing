import { Builder, By, until } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome'
import { expect } from 'chai'
require('dotenv').config()

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
    await driver.get(`${process.env.BASE_URL}/user/login`)

    await driver.findElement(By.name('email')).sendKeys(process.env.EMAIL)
    await driver.findElement(By.name('password')).sendKeys(process.env.PASSWORD)
    await driver.findElement(By.className('btn-sign btn btn-primary')).click()

    await driver.wait(until.elementLocated(By.className('dropdown-toggle nav-link')), 10000)
    let userName = await driver.findElement(By.className('dropdown-toggle nav-link')).getText()
    expect(userName.includes('Test Test'))
  })
})
