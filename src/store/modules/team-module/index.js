import axios from 'axios';

const state = {
    teams: [
        {
            subject: "مطالب فنی",
            pk: 4,
            members: [
                {
                    pk: 1,
                    name: 'محمد',
                    student_no: "923847"
                },
            ],
        },
        {
            pk: 5,
            members: [
                {
                    pk: 1,
                    name: 'محمد',
                    student_no: "923847"
                },
                {
                    pk: 2,
                    name: 'امیر',
                    student_no: "213123"
                }
            ],
        },
        {
            pk: 6,
            members: [
                {
                    pk: 1,
                    name: 'محمد',
                    student_no: "923847"
                },
                {
                    pk: 2,
                    name: 'امیر',
                    student_no: "213123"
                }
            ],
        },
        {
            pk: 4,
            members: [
                {
                    pk: 1,
                    name: 'محمد',
                    student_no: "923847"
                },
            ],
        },
        {
            pk: 5,
            members: [
                {
                    pk: 1,
                    name: 'محمد',
                    student_no: "923847"
                },
                {
                    pk: 2,
                    name: 'امیر',
                    student_no: "213123"
                }
            ],
        },
        {
            pk: 6,
            members: [
                {
                    pk: 1,
                    name: 'محمد',
                    student_no: "923847"
                },
                {
                    pk: 2,
                    name: 'امیر',
                    student_no: "213123"
                }
            ],
        },
        {
            pk: 4,
            members: [
                {
                    pk: 1,
                    name: 'محمد',
                    student_no: "923847"
                },
            ],
        },
        {
            pk: 5,
            members: [
                {
                    pk: 1,
                    name: 'محمد',
                    student_no: "923847"
                },
                {
                    pk: 2,
                    name: 'امیر',
                    student_no: "213123"
                }
            ],
        },
        {
            pk: 6,
            members: [
                {
                    pk: 1,
                    name: 'محمد',
                    student_no: "923847"
                },
                {
                    pk: 2,
                    name: 'امیر',
                    student_no: "213123"
                }
            ],
        }
    ],
};

const mutations = {};

const actions = {};

const getters = {
    teams: (state) => state.teams,
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
