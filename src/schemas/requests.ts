import { z } from "zod";
import {
  BusinessFieldCoordinatesSchema,
  CropRotationEndDateSchema,
  CropRotationStartDateSchema,
  GeometryTypeEnum,
  SeasonEndDateSchema,
  SeasonStartDateSchema,
} from "./utils";

export const SignUpRequestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const SignUpRequestSchema = z.object({
  body: SignUpRequestBodySchema,
});

export const SignInRequestBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const SignInRequestSchema = z.object({
  body: SignInRequestBody,
});

export const CreateWorkspaceRequestBodySchema = z.object({
  name: z.string(),
});
export const CreateWorkspaceRequestSchema = z.object({
  body: CreateWorkspaceRequestBodySchema,
});

export const UpdateWorkspaceRequestBodySchema = z.object({
  name: z.string(),
});
export const UpdateWorkspaceRequestParamsSchema = z.object({
  id: z.string(),
});
export const UpdateWorkspaceRequestSchema = z.object({
  body: UpdateWorkspaceRequestBodySchema,
  params: UpdateWorkspaceRequestParamsSchema,
});

export const DeleteWorkspaceRequestParamsSchema = z.object({
  id: z.string(),
});
export const DeleteWorkspaceRequestSchema = z.object({
  params: DeleteWorkspaceRequestParamsSchema,
});

export const CreateWorkspaceSeasonRequestBodySchema = z.object({
  name: z.string(),
  startDate: SeasonStartDateSchema,
  endDate: SeasonEndDateSchema,
});
export const CreateWorkspaceSeasonRequestParamsSchema = z.object({
  id: z.string(),
});
export const CreateWorkspaceSeasonRequestSchema = z.object({
  body: CreateWorkspaceSeasonRequestBodySchema,
  params: CreateWorkspaceSeasonRequestParamsSchema,
});

export const GetWorkspaceSeasonRequestParamsSchema = z.object({
  id: z.string(),
});
export const GetWorkspaceSeasonsRequestSchema = z.object({
  params: GetWorkspaceSeasonRequestParamsSchema,
});

export const UpdateSeasonRequestBodySchema = z.object({
  name: z.string(),
  startDate: SeasonStartDateSchema,
  endDate: SeasonEndDateSchema,
});
export const UpdateSeasonRequestParamsSchema = z.object({
  id: z.string(),
});
export const UpdateSeasonRequestSchema = z.object({
  body: UpdateSeasonRequestBodySchema,
  params: UpdateSeasonRequestParamsSchema,
});

export const DeleteSeasonRequestParamsSchema = z.object({
  id: z.string(),
});
export const DeleteSeasonRequestSchema = z.object({
  params: DeleteSeasonRequestParamsSchema,
});

export const GetSeasonBusinessFieldsRequestParamsSchema = z.object({
  id: z.string(),
});
export const GetSeasonBusinessFieldsRequestSchema = z.object({
  params: GetSeasonBusinessFieldsRequestParamsSchema,
});

export const CreateSeasonBusinessFieldRequestBodySchema = z.object({
  name: z.string(),
  geometry: z.object({
    type: GeometryTypeEnum,
    coordinates: BusinessFieldCoordinatesSchema,
  }),
  cropRotations: z.array(
    z.object({
      cropId: z.string(),
      startDate: CropRotationStartDateSchema,
      endDate: CropRotationEndDateSchema,
    })
  ),
});
export const CreateSeasonBusinessFieldRequestParamsSchema = z.object({
  id: z.string(),
});
export const CreateSeasonBusinessFieldRequestSchema = z.object({
  body: CreateSeasonBusinessFieldRequestBodySchema,
  params: CreateSeasonBusinessFieldRequestParamsSchema,
});

export const UpdateBusinessFieldRequestBodySchema = z.object({
  name: z.string(),
  geometry: z.object({
    type: GeometryTypeEnum,
    coordinates: BusinessFieldCoordinatesSchema,
  }),
  cropRotations: z.array(
    z.object({
      id: z.string(),
      cropId: z.string(),
      startDate: CropRotationStartDateSchema,
      endDate: CropRotationEndDateSchema,
    })
  ),
});
export const UpdateBusinessFieldRequestParamsSchema = z.object({
  id: z.string(),
});
export const UpdateBusinessFieldRequestSchema = z.object({
  body: UpdateBusinessFieldRequestBodySchema,
  params: UpdateBusinessFieldRequestParamsSchema,
});

export const DeleteBusinessFieldRequestParamsSchema = z.object({
  id: z.string(),
});
export const DeleteBusinessFieldRequestSchema = z.object({
  params: DeleteBusinessFieldRequestParamsSchema,
});
