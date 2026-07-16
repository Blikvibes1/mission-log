export type Apod = {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  copyright?: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  apod_date: string;
  title: string;
  image_url: string;
  created_at: string;
};
