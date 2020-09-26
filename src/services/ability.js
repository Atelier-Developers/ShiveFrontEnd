import {AbilityBuilder, Ability} from "@casl/ability";

export default function defineAbilityFor(role){
    const {can, cannot, rules} = new AbilityBuilder();

    switch (role) {
        case 'admin':
            console.log("admin is here");
            can('create', 'subject');
            can('edit', 'subject');
            can('delete', 'subject');
            break;
        case 'accepted':
            break;
        case 'not accepted':
            break;
        default:
    }
    return new Ability(rules)
};