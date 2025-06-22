import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'
import { RiskScoreCalculatorDto } from './dto/risk-score-dto'

test.describe('Risk Score Calculator', () => {
  test('Unsuccessful risk score calculation with 0 data in the body; 400', async ({
    request,
  }) => {
    const requestBody = new RiskScoreCalculatorDto(0, 0, 0, true, 0, 0)
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Unsuccessful risk score calculation with invalid data in the debt; 400', async ({
    request,
  }) => {
    const requestBody: RiskScoreCalculatorDto = new RiskScoreCalculatorDto(1, -5, 17, true, 500, 6)
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
  })

  test('Unsuccessful risk score calculation with invalid data in the age; 400', async ({
    request,
  }) => {
    const requestBody: RiskScoreCalculatorDto = new RiskScoreCalculatorDto(1, 0, 10, true, 500, 6)
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    expect.soft(response.status()).toBe(StatusCodes.OK)
  })

  test('Successful positive low risk level calculation; 200', async ({ request }) => {
    const requestBody: RiskScoreCalculatorDto = new RiskScoreCalculatorDto(
      20000,
      0,
      30,
      true,
      500,
      12,
    )
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    const body = await response.json()

    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(body.riskScore).toBeCloseTo(2.0375)
    expect.soft(body.riskLevel).toBe('Low Risk')
    expect.soft(body.riskPeriods).toEqual([12, 18, 24, 30, 36])
    expect.soft(body.riskDecision).toBe('positive')
    expect.soft(body.applicationId).toBeDefined()
  })

  test('Successful positive medium risk level calculation; 200', async ({ request }) => {
    const requestBody: RiskScoreCalculatorDto = new RiskScoreCalculatorDto(
      20000,
      0,
      30,
      true,
      500,
      6,
    )
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    const body = await response.json()

    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(body.riskScore).toBeCloseTo(1.01875)
    expect.soft(body.riskLevel).toBe('Medium Risk')
    expect.soft(body.riskPeriods).toEqual([6, 9, 12])
    expect.soft(body.riskDecision).toBe('positive')
    expect.soft(body.applicationId).toBeDefined()
  })

  test('Successful negative high risk level calculation; 200', async ({ request }) => {
    const requestBody: RiskScoreCalculatorDto = new RiskScoreCalculatorDto(
      100,
      0,
      17,
      true,
      1000,
      12,
    )
    const response = await request.post(
      'https://backend.tallinn-learning.ee/api/loan-calc/decision',
      {
        data: requestBody,
      },
    )
    const body = await response.json()

    expect.soft(response.status()).toBe(StatusCodes.OK)
    expect.soft(body.riskScore).toBeCloseTo(17.2)
    expect.soft(body.riskLevel).toBe('Very High Risk')
    expect.soft(body.riskPeriods).toEqual([])
    expect.soft(body.riskDecision).toBe('negative')
    expect.soft(body.applicationId).toBeDefined()
  })
})
