import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AmadeusService {
  clientId = this.configService.get<string>('AMADEUS_CLIENT_ID');
  clientSecret = this.configService.get<string>('AMADEUS_CLIENT_SECRET');
  baseUrl = this.configService.get<string>('AMADEUS_BASE_URL');
  token = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
    'base64',
  );

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async searchFlights(params: any): Promise<any> {
    const response = await this.httpService
      .get(`${this.baseUrl}/shopping/flight-offers`, {
        headers: { Authorization: `Basic ${this.token}` },
        params,
      })
      .toPromise();

    return response.data;
  }

  async getDestinationDetails(city: string): Promise<any> {
    const response = await this.httpService
      .get(`${this.baseUrl}/reference-data/locations/cities`, {
        headers: { Authorization: `Basic ${this.token}` },
        params: { keyword: city },
      })
      .toPromise();

    return response.data;
  }

  async searchHotels(params: any): Promise<any> {
    const response = await this.httpService
      .get(`${this.baseUrl}/shopping/hotel-offers`, {
        headers: { Authorization: `Basic ${this.token}` },
        params,
      })
      .toPromise();

    return response.data;
  }
}
