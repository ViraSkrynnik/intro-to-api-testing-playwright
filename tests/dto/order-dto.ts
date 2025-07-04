export class OrderDto {
  status: string
  courierId: number
  customerName: string
  customerPhone: string
  comment: string
  id: number

  private constructor(
    status: string,
    courierId: number,
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number,
  ) {
    this.status = status
    this.courierId = courierId
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }
  static createOrderWithRandomData(): OrderDto {
    return new OrderDto(
      'OPEN',
      Math.floor(Math.random() * 100),
      'John Doe',
      '+1234567890',
      'pizza',
      Math.floor(Math.random() * 100),
    )
  }
}
