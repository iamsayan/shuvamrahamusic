export interface CollectionGeneric {
  [key: string]: unknown;
}

export type CollectionItem<T extends object = Record<string, unknown>> =
  CockpitEntity & T;

export interface CockpitEntity {
  _id: string;
  _created: number;
  _modified: number;
  _cby?: string | null;
  _mby?: string | null;
  _state?: number;
}

export interface CockpitOptions {
  filter?: Record<string, unknown>;
  sort?: Record<string, 0 | 1 | -1>;
  limit?: number;
  skip?: number;
  populate?: number;
  fields?: string[];
}

// export interface AssetImageOptions {
//   w: number;
//   h: number;
//   m?: 'thumbnail' | 'bestFit' | 'resize' | 'fitToWidth' | 'fitToHeight';
//   q?: number;
//   mime?: 'auto' | 'gif' | 'jpeg' | 'png' | 'webp' | 'bmp';
//   re?: 0 | 1;
//   t?: string;
//   o?: 0 | 1;
// }

// export interface AssetPresetOptions {
//   re?: 0 | 1;
//   o?: 0 | 1;
// }

export interface CockpitAsset extends CockpitEntity {
  path: string;
  title: string;
  mime: string;
  type: string;
  description?: string;
  tags?: string[];
  size: number;
  width?: number;
  height?: number;
  colors?: string[];
  altText?: string;
  thumbhash?: string;
  folder?: string;
  _hash?: string;
}

export interface InboxRecord<T = Record<string, unknown>> {
  data: T;
  attachments: unknown[];
  spam: boolean;
  _created: number;
  _id: string;
}

export interface InboxSubmitResponse<T = Record<string, unknown>> {
  success: boolean;
  record: InboxRecord<T>;
}

interface CockpitErrorResponse {
  error: string;
}

interface RequestOptions extends RequestInit {
  revalidate?: number;
}

interface InboxSubmitOptions {
  success?: string;
}

type ResponseType = 'json' | 'text' | 'blob';

class CockpitAPI {
  private readonly baseURL: string = '';
  private readonly apiKey: string = '';
  public readonly isConfigured: boolean = false;

  constructor() {
    const baseURL = process.env.API_URL;
    const apiKey = process.env.API_KEY;

    if (baseURL && apiKey) {
      this.baseURL = baseURL.replace(/\/$/, '');
      this.apiKey = apiKey;
      this.isConfigured = true;
    }
  }

  private buildQuery<T extends object>(params: T): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }

      searchParams.append(
        key,
        typeof value === 'object' ? JSON.stringify(value) : String(value)
      );
    });

    const query = searchParams.toString();

    return query ? `?${query}` : '';
  }

  async request<T = unknown>(
    endpoint: string,
    options: RequestOptions = {},
    responseType: ResponseType = 'json'
  ): Promise<T> {
    if (!this.isConfigured) {
      throw new Error(
        'Cockpit API is not configured. API_URL or API_KEY is missing.'
      );
    }

    const { revalidate = 604800, ...fetchOptions } = options;

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...fetchOptions,
      headers: {
        'api-key': this.apiKey,
        ...fetchOptions.headers,
      },
      next: {
        revalidate,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Cockpit API Error (${response.status} ${response.statusText})`
      );
    }

    switch (responseType) {
      case 'blob':
        return (await response.blob()) as T;

      case 'text':
        return (await response.text()) as T;

      case 'json':
      default: {
        const contentType = response.headers.get('content-type') ?? '';

        if (!contentType.includes('application/json')) {
          return undefined as T;
        }

        const data = await response.json();

        if (data && typeof data === 'object' && 'error' in data) {
          throw new Error((data as CockpitErrorResponse).error);
        }

        return data as T;
      }
    }
  }

  /*
   |--------------------------------------------------------------------------
   | Content
   |--------------------------------------------------------------------------
   */

  getItems<T = unknown>(
    model: string,
    options: CockpitOptions = {},
    revalidate = 604800
  ) {
    return this.request<T>(
      `/content/items/${model}${this.buildQuery({ skip: 0, limit: 1000, ...options })}`,
      { revalidate }
    );
  }

  getSingleton<T = unknown>(model: string, revalidate = 604800) {
    return this.request<T>(`/content/item/${model}`, { revalidate });
  }

  getItem<T = unknown>(model: string, id: string, revalidate = 604800) {
    return this.request<T>(`/content/item/${model}/${id}`, { revalidate });
  }

  createItem<T = unknown>(model: string, payload: Record<string, unknown>) {
    return this.request<T>(`/content/item/${model}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      revalidate: 0,
    });
  }

  updateItem<T = unknown>(
    model: string,
    id: string,
    payload: Record<string, unknown>
  ) {
    return this.request<T>(`/content/item/${model}/${id}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      revalidate: 0,
    });
  }

  deleteItem<T = unknown>(model: string, id: string) {
    return this.request<T>(`/content/item/${model}/${id}`, {
      method: 'DELETE',
      revalidate: 0,
    });
  }

  /*
   |--------------------------------------------------------------------------
   | Tree
   |--------------------------------------------------------------------------
   */

  getTree<T = unknown>(model: string, revalidate = 604800) {
    return this.request<T>(`/content/tree/${model}`, { revalidate });
  }

  /*
   |--------------------------------------------------------------------------
   | Aggregate
   |--------------------------------------------------------------------------
   */

  aggregate<T = unknown>(model: string, payload: unknown) {
    return this.request<T>(`/content/aggregate/${model}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      revalidate: 0,
    });
  }

  /*
   |--------------------------------------------------------------------------
   | Assets
   |--------------------------------------------------------------------------
   */

  getAsset(assetId: string, revalidate = 3600) {
    return this.request<CockpitAsset>(`/assets/${assetId}`, { revalidate });
  }

  /*
   |--------------------------------------------------------------------------
   | Inbox
   |--------------------------------------------------------------------------
   */

  submitInbox<T extends object>(
    token: string,
    data: T,
    options: InboxSubmitOptions = {}
  ) {
    return this.request<InboxSubmitResponse<T>>(
      `/inbox/submit/${token}${this.buildQuery(options)}`,
      {
        method: 'POST',
        body: JSON.stringify({ data }),
        headers: {
          'Content-Type': 'application/json',
        },
        revalidate: 0,
      }
    );
  }

  /*
   |--------------------------------------------------------------------------
   | System
   |--------------------------------------------------------------------------
   */

  healthcheck<T = unknown>() {
    return this.request<T>('/system/healthcheck', {
      revalidate: 0,
    });
  }
}

const cockpit = new CockpitAPI();

export default cockpit;
