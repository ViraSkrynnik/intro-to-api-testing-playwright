import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'
import { OrderDto } from './dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

test.describe('Tallinn delivery API tests', () => {
  test('login with correct data and verify auth token', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    console.log('requestBody:', requestBody)
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const responseBody = await response.text()
    const jwtValue = await response.text()
    const jwtRegex = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/

    console.log('response code:', response.status())
    console.log('response body:', responseBody)
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(jwtValue).toMatch(jwtRegex)
  })

  test('login with incorrect data and verify response code 401', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithIncorrectData()
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const responseBody = await response.text()

    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
    expect(responseBody).toBe('')
  })

  test('login with correct data and incorrect HTTP method PUT', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.put(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })

    const responseBody = await response.json()

    expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
    expect.soft(responseBody.path).toBe(`/${loginPath}`)
  })

  test('login with incorrect HTTP method GET', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.get(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })

    const responseBody = await response.json()

    expect.soft(responseBody.path).toBe(`/${loginPath}`)
    expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
  })

  test('login with invalid body structure 401', async ({ request }) => {
    const invalidRequestBody = {}
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: invalidRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const responseBody = await response.text()

    expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
    expect(responseBody).toBe('')
  })

  test('login and create order', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const jwt = await response.text()
    const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
      data: OrderDto.createOrderWithRandomData(),
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    const orderResponseBody = await orderResponse.json()

    expect.soft(orderResponse.status()).toBe(StatusCodes.OK)
    expect.soft(orderResponseBody.status).toBe('OPEN')
    expect.soft(orderResponseBody.id).toBeDefined()
  })
})
