import { test, expect } from '@playwright/test'
import { ApiClient } from './api-client'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'
import { OrderDto } from './dto/order-dto'


test.describe('Tallinn delivery tests without API client', () => {
  const serviceURL = 'https://backend.tallinn-learning.ee/'
  const loginPath = 'login/student'
  const orderPath = 'orders'

  test('Successful login and getting order by id without API client', async ({ request }) => {
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
    const createOrderBody = await orderResponse.json()
    const orderId = createOrderBody.id
    const getOrderById = await request.get(`${serviceURL}${orderPath}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const responseBody = await getOrderById.json()
    expect.soft(getOrderById.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.id).toBe(orderId)
  })

  test('Successful login and deleting order by id without API client', async ({ request }) => {
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
    const createOrderBody = await orderResponse.json()
    expect.soft(orderResponse.status()).toBe(StatusCodes.OK)
    expect.soft(createOrderBody.id).toBeDefined()
    const orderId = createOrderBody.id
    const deleteOrderById = await request.delete(`${serviceURL}${orderPath}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const responseBody = response.ok()
    expect.soft(deleteOrderById.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody).toBeTruthy()
  })
})

test.describe('Tallinn delivery tests with API client', () => {
  test('Successful login and getting order by id with API client', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()
    const response = await apiClient.getOrderById(orderId)
    const responseBody = await response.json()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody.id).toBe(orderId)
  })

  test('Successful login and deleting order by id with API client', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()
    const response = await apiClient.deleteOrder(orderId)
    const responseBody = response.ok()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody).toBeTruthy()
  })

  test('login and create order with api client', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()
    console.log('orderId:', orderId)
  })

  test('Successful login and delete existed order with api client', async ({ request }) => {
    const apiClient = await ApiClient.getInstance(request)
    const orderId = await apiClient.createOrderAndReturnOrderId()
    const response = await apiClient.deleteOrder(orderId)
    const responseBody = response.ok()
    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(responseBody).toBeTruthy()
  })
})
