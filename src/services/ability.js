import {AbilityBuilder, Ability} from "@casl/ability";

export default function defineAbilityFor(role) {
    const {can, cannot, rules} = new AbilityBuilder();
    can("access", "authenticate")
    switch (role) {
        case 'admin':
            can('read', 'all');
            cannot('read', 'teampresentation')
            can('create', 'announcment');

            can('create', 'subject');
            can('edit', 'subject');
            can('read', 'subject');
            can('delete', 'subject');

            can('create', 'team');
            can('edit', 'team');
            can('read', 'team');
            can('delete', 'team');

            can('create', 'user');
            can('edit', 'user');
            can('read', 'user');
            can('delete', 'user');
            break;
        case 'accepted':
            can('read', 'all');
            can('read', 'teamPresentation')
            cannot('create', 'announcment');

            cannot('create', 'subject');
            cannot('edit', 'subject');
            cannot('read', 'subject');
            cannot('delete', 'subject');

            cannot('create', 'team');
            cannot('edit', 'team');
            cannot('read', 'team');
            cannot('delete', 'team');

            cannot('create', 'user');
            cannot('edit', 'user');
            cannot('read', 'user');
            cannot('delete', 'user');
            break;
        case 'not accepted':
            break;
        default:
    }
    return new Ability(rules)
};

export const ability = defineAbilityFor('')