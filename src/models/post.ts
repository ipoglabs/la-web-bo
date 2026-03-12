import mongoose, {
  Schema,
  models,
  model,
  type HydratedDocument,
  type Model,
} from "mongoose";

export interface IPost {
  name: string;
  description: string;
  images: string[];
  category: string;
  subcategory: string;

  ownerId?: mongoose.Types.ObjectId;

  status?: "pending" | "active" | "off" | "expired" | "deleted";
  expiresAt?: Date;
  lastBumpedAt?: Date;
  deletedAt?: Date;

  location?: {
    address?: string;
    lat?: number;
    lng?: number;
  };

  seller_info: {
    name: string;
    phone: string;
    email: string;
  };

  /** ===== Property ===== */
  propertyType?: string;
  beds?: number;
  baths?: number;
  rentPrice?: number;
  salePrice?: number;
  deposit?: number;
  facilities?: string[];
  amenities?: string[];
  occupancy?: string;
  gender_pref?: string;

  builtup_area?: number;
  carpet_area?: number;
  floor?: number;
  totalFloors?: number;
  furnishing?: string;
  washrooms?: number;
  pantry?: string;
  parkingSpaces?: number;
  maintenance?: number;
  available_from?: string;
  leaseTerm?: number;
  powerBackup?: string;

  holidayType?: string;
  guests?: number;
  house_rules?: string[];
  rateNightly?: number;
  rateWeekly?: number;
  rateMonthly?: number;

  type?: string;
  rent?: number;
  preferred_tenants?: string;
  rules?: string[];

  plot_area?: number;
  negotiable?: string;
  ownership?: string;
  age?: string;

  /** ===== Search ===== */
  minBudget?: number;
  maxBudget?: number;
  minArea?: number;
  preferred_locations?: string[];

  /** ===== Jobs ===== */
  company?: string;
  clientName?: string;
  jobType?: string;
  workMode?: string;
  salary?: number;
  hourlyRate?: number;
  stipendType?: string;
  stipendAmount?: number;
  startDate?: string;
  endDate?: string;
  duration?: string;
  contractDuration?: string;
  workingHours?: string;
  deadline?: string;
  applyLink?: string;
  projectType?: string;
  budgetType?: string;
  budgetAmount?: number;
  experience?: string;
  skills?: string[];
  benefits?: string[];
  shifts?: string[];
  candidateName?: string;

  /** ===== Vehicles ===== */
  make?: string;
  model?: string;
  year?: number;
  kms?: number;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  color?: string;
  condition?: string;
  ownerType?: string;
  registrationNumber?: string;
  insuranceValidTill?: string;
  serviceHistory?: string;
  features?: string[];
  engineCapacity?: number;
  seatingCapacity?: number;

  /** ===== Pets ===== */
  petName?: string;
  petType?: string;
  breed?: string;
  ageText?: string;
  gender?: string;
  vaccination?: string;
  size?: string;
  wantedPetType?: string;
  breedPreference?: string;
  agePreference?: string;
  genderPreference?: string;
  sizePreference?: string;
  budget?: number;
  accessoryName?: string;
  partsCategory?: string;
  reportType?: string;
  lastSeenLocation?: string;
  lfDate?: string;
  serviceType?: string;
  serviceProviderName?: string;
  availability?: string;

  /** ===== Services ===== */
  educationType?: string;
  subject?: string;
  mode?: string;
  qualification?: string;
  price?: number;

  cuisineType?: string;
  dietaryOptions?: string[];
  deliveryAvailable?: string;

  providerName?: string;
  consultationMode?: string;

  rateType?: string;

  destination?: string;
  packageDetails?: string;
  agencyName?: string;
  durationText?: string;

  level?: string;
  urgency?: string;

  /** 🔴 Moderation (IMPORTANT FIX) */

  reported?: boolean;

  reports?: {
    reason?: string;
    by?: mongoose.Types.ObjectId;
    at?: Date;
  }[];

  reportedAt?: Date;
  reportedBy?: mongoose.Types.ObjectId;

  isSuspended?: boolean;
  suspendedAt?: Date;
  suspendedBy?: mongoose.Types.ObjectId;

  createdAt?: Date;
  updatedAt?: Date;
}

export type IPostDoc = HydratedDocument<IPost>;

const PostSchema = new Schema<IPost>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    category: { type: String, required: true, index: true },
    subcategory: { type: String, required: true, index: true },

    ownerId: { type: Schema.Types.ObjectId, ref: "User", index: true },

    status: {
      type: String,
      enum: ["pending", "active", "off", "expired", "deleted"],
      default: "pending",
      index: true,
    },

    expiresAt: { type: Date, index: true },
    lastBumpedAt: { type: Date, index: true },
    deletedAt: { type: Date, index: true },

    location: {
      address: String,
      lat: Number,
      lng: Number,
    },

    seller_info: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true, index: true },
    },

    propertyType: String,
    beds: Number,
    baths: Number,
    rentPrice: Number,
    salePrice: Number,
    deposit: Number,
    facilities: { type: [String], default: [] },
    amenities: { type: [String], default: [] },

    /* 🔴 Moderation */

    reported: { type: Boolean, default: false, index: true },

    reports: [
      {
        reason: String,
        by: { type: Schema.Types.ObjectId, ref: "AdminUser" },
        at: { type: Date, default: Date.now },
      },
    ],

    reportedAt: Date,

    reportedBy: {
      type: Schema.Types.ObjectId,
      ref: "AdminUser",
    },

    isSuspended: { type: Boolean, default: false, index: true },

    suspendedAt: Date,

    suspendedBy: {
      type: Schema.Types.ObjectId,
      ref: "AdminUser",
    },
  },
  { timestamps: true }
);

/** Indexes */
PostSchema.index({ ownerId: 1, updatedAt: -1 });
PostSchema.index({ status: 1, updatedAt: -1 });
PostSchema.index({ reported: 1, createdAt: -1 });
PostSchema.index({ isSuspended: 1 });

const Post: Model<IPost> =
  (models.Post as Model<IPost>) || model<IPost>("Post", PostSchema);

export type PostModel = typeof Post;
export type { IPost as PostDTO };

export default Post;