export interface VerificationDTO {
  id: string
  uploaderId: string
  providerId: string
  uploaderType: string
  docType: string
  docFileRef: string
  status: string
  approvalDate: string | null
  approvedByAdmin: string | null
}
