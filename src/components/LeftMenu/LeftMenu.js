import _ from 'lodash';
import React from 'react';
import ProcessingGroup from './ProcessingGroup';

const groups = [
    {
        label: 'Interface',
        buttons: [
            {
                color: 'blue',
                label: 'Abrir imagem'
            },
            {
                color: 'blue',
                label: 'Exibir imagem'
            },
            {
                color: 'blue',
                label: 'Gravar arquivo'
            }
        ]
    },
    {
        label: 'Processamento',
        buttons: [
            {
                color: 'yellow',
                label: 'Escala de cinza'
            },
            {
                color: 'yellow',
                label: 'Inverter cor'
            },
            {
                color: 'yellow',
                label: 'Clarear'
            },
            {
                color: 'yellow',
                label: 'Limite de tonalidade'
            },
            {
                color: 'yellow',
                label: 'Passa alta'
            },
            {
                color: 'yellow',
                label: 'Passa baixa'
            },
            {
                color: 'yellow',
                label: 'Realce borda'
            }
        ]
    },
    {
        label: 'Outros',
        buttons: [
            {
                color: 'black',
                label: 'testtesttesttest'
            },
            {
                color: 'black',
                label: 'testtesttest'
            },
            {
                color: 'black',
                label: 'testesttestte'
            }
        ]
    }
]

class LeftMenu extends React.Component {
    renderGroups() {
        return (
            _.map(groups, group => {
                return (
                    <ProcessingGroup key={group.label} group={group} />
                );
            })
        );
    }

    render() {
        return (
            <div>
                {this.renderGroups()}
            </div>
        );
    }
}

export default LeftMenu;