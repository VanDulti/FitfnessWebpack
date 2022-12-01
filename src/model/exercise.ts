export interface Exercise {
  id: number,
  name: string,
  category: string,
  body: string,
  description: string,
  image: string
}

/*
Sample json object:
{
  "name": "Squat",
  "category": "Barbell",
  "body": "Legs",
  "description": "Instructions:\n\n 1. Place the bar between the traps and the upper back, with the hands shoulder width apart.\n\n 2. Place feet shoulder width apart and descend by breaking at the hips and sitting backwards.\n\n 3. Keep the head in a neutral position, back and spine in a straight and neutral position, the core flexed and knees pushed slightly outwards.\n\n 4. Descend to the bottom where thighs are parallel to the floor.\n\n 5. Push through the heel and middle foot to bring yourself back to starting position.\n\n 6. Repeat for reps.",
  "image": "https://modusx.de/wp-content/uploads/2021/10/kniebeugen-ohne-gewicht-air-squat.gif"
}
*/