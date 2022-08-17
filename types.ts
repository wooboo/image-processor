export interface StorageDiagnostics {
  batchId: string;
}

export interface OperationData {
  api: string;
  clientRequestId: string;
  requestId: string;
  eTag: string;
  contentType: string;
  contentLength: number;
  blobType: string;
  url: string;
  sequencer: string;
  validationUrl?: string;
  storageDiagnostics: StorageDiagnostics;
}

export interface BlobEvent {
  topic: string;
  subject: string;
  eventType: EventType;
  id: string;
  data: OperationData;
  dataVersion: string;
  metadataVersion: string;
  eventTime: Date;
}
export enum EventType {
  BlobCreated = "Microsoft.Storage.BlobCreated",
  BlobDeleted = "Microsoft.Storage.BlobDeleted",
  BlobTierChanged = "Microsoft.Storage.BlobTierChanged",
  AsyncOperationInitiated = "Microsoft.Storage.AsyncOperationInitiated",
}

export type Processor = {
  order: number;
  canProcess: (event: BlobEvent) => boolean;
  process: (event: BlobEvent) => Promise<void>;
};
