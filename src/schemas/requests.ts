import { z } from "zod";
import {
  BusinessFieldCoordinatesSchema,
  GeometryTypeEnum,
  SeasonEndDateSchema,
  SeasonStartDateSchema,
} from "./utils";

export const SignUpRequestSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const SignInRequestSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

export const CreateWorkspaceRequestSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const UpdateWorkspaceRequestSchema = z.object({
  body: z.object({
    name: z.string(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const DeleteWorkspaceRequestSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const CreateWorkspaceSeasonRequestSchema = z.object({
  body: z.object({
    name: z.string(),
    startDate: SeasonStartDateSchema,
    endDate: SeasonEndDateSchema,
  }),
  params: z.object({
    workspaceId: z.string(),
  }),
});

export const GetWorkspaceSeasonsRequestSchema = z.object({
  params: z.object({
    workspaceId: z.string(),
  }),
});

export const UpdateSeasonRequestSchema = z.object({
  body: z.object({
    name: z.string(),
    startDate: SeasonStartDateSchema,
    endDate: SeasonEndDateSchema,
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const DeleteSeasonRequestSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const GetSeasonBusinessFieldsRequestSchema = z.object({
  params: z.object({
    seasonId: z.string(),
  }),
});

export const CreateSeasonBusinessFieldRequestSchema = z.object({
  body: z.object({
    name: z.string(),
    geometry: z.object({
      type: GeometryTypeEnum,
      coordinates: BusinessFieldCoordinatesSchema,
    }),
    crop: z
      .object({
        id: z.string(),
      })
      .nullable(),
  }),
  params: z.object({
    seasonId: z.string(),
  }),
});

export const UpdateBusinessFieldRequestSchema = z.object({
  body: z.object({
    name: z.string(),
    geometry: z.object({
      type: GeometryTypeEnum,
      coordinates: BusinessFieldCoordinatesSchema,
    }),
    crop: z
      .object({
        id: z.string(),
      })
      .nullable(),
  }),
  params: z.object({
    id: z.string(),
  }),
});

export const DeleteBusinessFieldRequestSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});
