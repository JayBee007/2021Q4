import 'package:flutter/material.dart';

import '../components/main_drawer.dart';

class FilterItem extends StatelessWidget {
  final Function handleChange;
  final String title;
  final String subtitle;
  final bool value;

  const FilterItem(
      {Key? key,
      required this.handleChange,
      required this.title,
      required this.subtitle,
      required this.value})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SwitchListTile(
      onChanged: (changedValue) {
        handleChange(changedValue);
      },
      title: Text(title),
      value: value,
      subtitle: Text(subtitle),
    );
  }
}

class FilterScreen extends StatefulWidget {
  static const routeName = '/filter';
  const FilterScreen({Key? key}) : super(key: key);

  @override
  State<FilterScreen> createState() => _FilterScreenState();
}

class _FilterScreenState extends State<FilterScreen> {
  bool _glutenFree = false;
  bool _vegetarian = false;
  bool _vegan = false;
  bool _lactoseFree = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Filters'),
        ),
        drawer: const MainDrawer(),
        body: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              child: Text('Adjust meal selection',
                  style: Theme.of(context).textTheme.headline6),
            ),
            Expanded(
              child: ListView(children: [
                FilterItem(
                  handleChange: (val) {
                    setState(() {
                      _glutenFree = val;
                    });
                  },
                  title: 'Gluten free',
                  value: _glutenFree,
                  subtitle: 'Only include gluten free meals',
                ),
                FilterItem(
                  handleChange: (val) {
                    setState(() {
                      _vegetarian = val;
                    });
                  },
                  title: 'Vegatarian',
                  value: _vegetarian,
                  subtitle: 'Only include vegatarian meals',
                ),
                FilterItem(
                  handleChange: (val) {
                    setState(() {
                      _vegan = val;
                    });
                  },
                  title: 'Vegan',
                  value: _vegan,
                  subtitle: 'Only include vegan meals',
                ),
                FilterItem(
                  handleChange: (val) {
                    setState(() {
                      _lactoseFree = val;
                    });
                  },
                  title: 'Lactose free',
                  value: _lactoseFree,
                  subtitle: 'Only include lactose free meals',
                )
              ]),
            )
          ],
        ));
  }
}
