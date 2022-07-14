import 'package:flut_exp/screens/recipe_screen.dart';
import 'package:flutter/material.dart';

import './config/palette.dart';

import './screens/meals_screen.dart';
import './screens/tabs_screen.dart';
import 'screens/filter_screen.dart';

void main() => runApp(const MealApp());

class MealApp extends StatelessWidget {
  const MealApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Meals',
      theme: ThemeData(
        primarySwatch: Palette.palette,
        colorScheme: ColorScheme.fromSwatch().copyWith(
          secondary: Palette.paletteAccent, // Your accent color
        ),
        canvasColor:  Colors.white,
        fontFamily: 'Raleway',
        textTheme: ThemeData.light().textTheme.copyWith(
          bodyText1: const TextStyle(color: Color.fromRGBO(20, 51, 51, 1)),
          bodyText2: const TextStyle(color: Color.fromRGBO(20, 51, 51, 1)),
          headline6: const TextStyle(
            fontSize: 20,
            fontFamily: 'RobotoCondensed',
            fontWeight: FontWeight.bold
          )
        )
      ),
      home: const TabScreen(),
      routes: {
        MealsScreen.routeName:(context) => const MealsScreen(),
        RecipeScreen.routeName: (context) => const RecipeScreen(),
        FilterScreen.routeName: (conetxt) => const FilterScreen()
      },
    );
  }
}
