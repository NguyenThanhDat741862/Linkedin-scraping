const puppeteer = require('puppeteer')

const {
  LOGIN_URL,
  JOB_LIST_URL
} = require('./url')

const {
  USERNAME_INPUT_SELECTOR,
  PASSWORD_INPUT_SELECTOR,
  SUBMIT_INPUT_SELECTOR
} = require('./selector')

const { 
  SCREENSHOT_PATH,
  ARCHIVE_PATH,
  SCREENSHOT_CONFIG,
  VIEWPORT_CONFIG,
  LAUNCH_CONFIG
} = require('./config')

const {
  initFolder,
  genFileName
} = require('./utils')

const {
  createWriterStream,
  closeWriterStream
} = require('./writer')

const extractor = require('./extractor')

async function main() {
  // Init folder
  initFolder(SCREENSHOT_PATH)
  initFolder(ARCHIVE_PATH)

  // Launch browser
  const browser = await puppeteer.launch(LAUNCH_CONFIG)
  const page = await browser.newPage()
  await page.setViewport(VIEWPORT_CONFIG)
  
  // Login
  await page.goto(LOGIN_URL)
  await page.type(USERNAME_INPUT_SELECTOR, 'latejohn1248@gmail.com')
  await page.type(PASSWORD_INPUT_SELECTOR, 'vvR)nJSn%Y3RiF5')
  await Promise.all([
    page.click(SUBMIT_INPUT_SELECTOR),
    page.waitForNavigation(),
  ])
  
  // Extract
  await page.goto(JOB_LIST_URL)
  const writer = createWriterStream()
  await extractor(page, writer)
  closeWriterStream(writer)

  await browser.close()
}

main()