/**
 * Created by jsherman on 6/9/17.
 */

// rda= recommended daily allowance of nutrients
// data from the USDA
// https://www.nal.usda.gov/sites/default/files/fnic_uploads//recommended_intakes_individuals.pdf
    //todo: probably should put these in the app object
    //todo: make a microservice api for this??
var rda = [];

// todo: is there a better structure to improve search speed?
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

// caloric need (EER= estimated energy requirement) based on USDA guidelines
// https://health.gov/dietaryguidelines/2015/guidelines/appendix-2/
var caloricNeed = [];

var malesEER = {
  '13': { sedentary: '2000' , moderate: '2200' ,  active: '2600' },
  '14': { sedentary: '2000' , moderate: '2400' ,  active: '2800' },
  '15': { sedentary: '2200' , moderate: '2600' ,  active: '3000' },
  '16': { sedentary: '2400' , moderate: '2800' ,  active: '3200' },
  '17': { sedentary: '2400' , moderate: '2800' ,  active: '3200' },
  '18': { sedentary: '2400' , moderate: '2800' ,  active: '3200' },
  '20': { sedentary: '2600' , moderate: '2800' ,  active: '3000' },
  '25': { sedentary: '2400' , moderate: '2800' ,  active: '3000' },
  '30': { sedentary: '2400' , moderate: '2600' ,  active: '3000' },
  '35': { sedentary: '2400' , moderate: '2600' ,  active: '3000' },
  '40': { sedentary: '2400' , moderate: '2600' ,  active: '2800' },
  '45': { sedentary: '2200' , moderate: '2600' ,  active: '2800' },
  '50': { sedentary: '2200' , moderate: '2400' ,  active: '2800' },
  '55': { sedentary: '2200' , moderate: '2400' ,  active: '2800' },
  '60': { sedentary: '2200' , moderate: '2400' ,  active: '2600' },
  '65': { sedentary: '2000' , moderate: '2400' ,  active: '2600' },
  '70': { sedentary: '2000' , moderate: '2200' ,  active: '2600' },
  '75': { sedentary: '2000' , moderate: '2200' ,  active: '2600' },
  '76': { sedentary: '2000' , moderate: '2200' ,  active: '2400' }
};

var femalesEER = {
    '13': {sedentary: '1600', moderate: '2000', active: '2200'},
    '14': {sedentary: '1800', moderate: '2000', active: '2400'},
    '15': {sedentary: '1800', moderate: '2000', active: '2400'},
    '16': {sedentary: '1800', moderate: '2000', active: '2400'},
    '17': {sedentary: '1800', moderate: '2000', active: '2400'},
    '18': {sedentary: '1800', moderate: '2000', active: '2400'},
    '20': {sedentary: '2000', moderate: '2200', active: '2400'},
    '25': {sedentary: '2000', moderate: '2200', active: '2400'},
    '30': {sedentary: '1800', moderate: '2000', active: '2400'},
    '35': {sedentary: '1800', moderate: '2000', active: '2200'},
    '40': {sedentary: '1800', moderate: '2000', active: '2200'},
    '45': {sedentary: '1800', moderate: '2000', active: '2200'},
    '50': {sedentary: '1800', moderate: '2000', active: '2200'},
    '55': {sedentary: '1600', moderate: '1800', active: '2200'},
    '60': {sedentary: '1600', moderate: '1800', active: '2200'},
    '65': {sedentary: '1600', moderate: '1800', active: '2000'},
    '70': {sedentary: '1600', moderate: '1800', active: '2000'},
    '75': {sedentary: '1600', moderate: '1800', active: '2000'},
    '76': {sedentary: '1600', moderate: '1800', active: '2000'}
};