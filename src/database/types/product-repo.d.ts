type ProductRepo = {
  id: number;
  name: string;
  price: number;
  created_at: number;
  updated_at: number;
};

type TableRepo = {
  id: number;
  table_number: number;
  created_at: number;
  updated_at: number;
};

type TableSessionRepo = {
  id: number;
  table_id: number;
  opened_at: number;
  closed_at: number;
};
