import { Offer } from '../entities/offer.entity';

export class PaginateOfferDto {
  page_size: number;
  current_page: number;
  total_items: number;
  total_pages: number;
  items: Array<Offer>;
}
