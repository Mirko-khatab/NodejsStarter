import { Document, Mongoose, SchemaTimestampsConfig } from "mongoose"

interface MongooseDoc extends Document, SchemaTimestampsConfig {}

type Crown = "red" | "blue"
type Lang = "en" | "ar" | "fr"
type Status = "online" | "offline"

type RelationShip = "single" | "margie"

type RoomRole = "user" | "admin" | "creator" | "owner"

type View = "public" | "private" | "country"

// user type
interface User extends MongooseDoc {
  name: string
  lastRequestTime: Date
  username: string
  email: string
  isOnline: boolean
  password: string
  purse: number
  role: "admin" | "user" | "merchant" | "super_admin" | "manager" | "top_user"
  color: {
    bgColor: string
    nameColor: string
    textColor: string
  }
  address: {
    city: string
    country: string
    ip: string
  }
  phoneNumber: string
  gender: "male" | "female"
  age: number
  crown: Crown
  invisible: {
    status: boolean
    canChangeIt: boolean
    expire: string
  }
  status: Status
  relationShip: RelationShip
  isBlocked: boolean
  idToShow: string
  profilePicture: string
  verify: boolean
  ImageRating: number
  vote: {
    votePurse: number
    voteGiftExpire: string
  }
  ImageSize: String
  comparePassword: (password: string) => Promise<boolean>
}

// room
interface Room extends MongooseDoc {
  name: string
  creator: Object
  owner: Object
  admins: [
    {
      user: Object
    }
  ]
  rank: number
  view: View
  lang: Lang
  country: string
  idToShow: string
  vote: {
    votePurse: number
    voteGiftExpire: string
  }
}

interface Conversation extends MongooseDoc {
  user: Object
  room: Object
  isBlocked: boolean
  crown: string
}

interface Message extends MongooseDoc {
  conversation: Object
  user: Object
  room: Object
  textColor: string
  text: string
}

interface privateMessage extends MongooseDoc {
  sender: Object
  receive: Object
  textColor: string
  text: string
}

interface messageToAdmin extends MongooseDoc {
  user: Object
  text: string
}

interface favoriteUser extends MongooseDoc {
  user: Object
  favoriteUser: Object
}

interface favoriteRooms extends MongooseDoc {
  user: Object
  favoriteRoom: Object
}
// type Collection = {
//   user: Object
//   rating: number
// }

interface Rating extends MongooseDoc {
  users: [
    {
      user: Object
      ImageRating: number
    }
  ]
}

interface HistoryPurse extends MongooseDoc {
  user: Object
  purse: number
  type: "sub" | "add"
  receiver: Object
  typeSpend: string
}

interface News extends MongooseDoc {
  user: Object
  text: string
  expire: Date
  color: {
    bgColor: string
    textColor: string
  }
  isOneTime: boolean
  userIds: string[]
}

interface IgnoreUser extends MongooseDoc {
  user: Object
  ignoreUser: Object
}

interface InviteToRoom extends MongooseDoc {
  user: Object
  room: Object
}
