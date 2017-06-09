/**
 * Created by jsherman on 6/9/17.
 */

// rda= recommended daily allowance of nutrients
// data from the USDA
// https://www.nal.usda.gov/sites/default/files/fnic_uploads//recommended_intakes_individuals.pdf

    //todo: make a microservice api for this??
var rda = [];

var males =  {
    '13': { ageMin: '9',  ageMax: '13', protein: '34',  fat: 'ND', fiber: '31', carbs: '130' },
    '18': { ageMin: '14',  ageMax: '18', protein: '52',  fat: 'ND', fiber: '38', carbs: '130' },
    '30': { ageMin: '19',  ageMax: '30', protein: '56',  fat: 'ND', fiber: '38', carbs: '130' },
    '50': { ageMin: '31',  ageMax: '50', protein: '56',  fat: 'ND', fiber: '38', carbs: '130' },
    '70': { ageMin: '31',  ageMax: '70', protein: '56',  fat: 'ND', fiber: '30', carbs: '130' },
    '71': { ageMin: '71',  ageMax: '-1', protein: '56',  fat: 'ND', fiber: '30', carbs: '130' }
};

var females =  {
    '13': { ageMin: '9',  ageMax: '13', protein: '34',  fat: 'ND', fiber: '26', carbs: '130' },
    '18': { ageMin: '14',  ageMax: '18', protein: '46',  fat: 'ND', fiber: '26', carbs: '130' },
    '30': { ageMin: '19',  ageMax: '30', protein: '46',  fat: 'ND', fiber: '25', carbs: '130' },
    '50': { ageMin: '31',  ageMax: '50', protein: '46',  fat: 'ND', fiber: '25', carbs: '130' },
    '70': { ageMin: '31',  ageMax: '70', protein: '46',  fat: 'ND', fiber: '21', carbs: '130' },
    '71': { ageMin: '71',  ageMax: '-1', protein: '46',  fat: 'ND', fiber: '21', carbs: '130' }
};

rda.push(males, females);