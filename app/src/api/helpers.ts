import { Alert } from "react-native";
import { Coupon, HistoriqueCoupon, Store, User, UserCoupon } from "../entities";

export const setIncludes = (includes?: Array<string>) => {
    return {params: { includes: includes?.join(',')}}
}

export const setUser = (user: Object): User => {
    return {id: user['id'], attributes: {
            firstName: user['firstName'],
            lastName: user['lastName'],
            email: user['email'],
            token: user['token'],
            registerDate: user['register_date'],
            birthday: user['birthday'],
        },
        relationships:{
            stores: user['stores'],
            coupons: user['coupons'],
        }
    };
}

export const setUserCoupon = (uc: Object): UserCoupon => {
    return {id: uc['id'], attributes: {
            used: uc['used'],
            favored: uc['favored']
        },
        relationships:{
            user: uc['user'],
            coupon: uc['coupon'],
        }
    };
}

export const setHistoriqueCoupon = (hc: Object): HistoriqueCoupon => {
    return {id: hc['id'], attributes: {
            usedTime: hc['used_time'],
        },
        relationships:{
            userCoupon: hc['user_coupon'],
        }
    };
}

export const setCoupon = (coupon: Object): Coupon => {
    return {
        id: coupon['id'],
        attributes: {
            title: coupon['title'],
            start: coupon['start'],
            end: coupon['end'],
            offer: coupon['offer'],
            icon: coupon['icon'],
            description: coupon['description'],
            maxLimit: coupon['max_limit'],
            unique: coupon['unique'],
            code: coupon['code'],
            valid: coupon['valid']
        },
    };
};

export const setStore = (store: Object): Store => {
    return {id: store['id'],
        attributes: {
            name: store['name'],
            localization: store['localization'],
        },
        relationships:{
            users: store['users'],
            coupons: store['coupons'],
        }
    };
}

export const handleErrorMessages = (code?: number) => {
    switch (code){
        case -1:
            Alert.alert('Erreur : Des paramètres sont manquants');
            break;

        case -2:
            Alert.alert(`Vous n'êtes pas autorisé à executer cette action`);
            break;

        case -10:
            Alert.alert(`Ce coupon n'est plus valide`);
            break;

        case -11:
            Alert.alert('Ce coupon figure déjà parmi les vôtres');
            break;

        case -13:
            Alert.alert('Vous avez déjà utilisé ce coupon');
            break;

        case -14:
            Alert.alert('Ce coupon a été utilisé par trop de personnes');
            break;

        case -20:
            Alert.alert('Cet email existe déjà...');
            break;

        case -21:
            Alert.alert('Email incorrect');
            break;

        case -22:
            Alert.alert('Mot de passe incorrect');
            break;

        case -23:
            Alert.alert('Mauvais ancien mot de passe');
            break;

        default:
            Alert.alert('Une erreur inconnue est survenue...');
            break;
    }

    return -1;
}
