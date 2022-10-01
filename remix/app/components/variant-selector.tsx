import isEqual from "lodash/isEqual";
import React from "react";

function reduceAttributes(variants) {
  return variants.reduce((acc, variant) => {
    const attrs = acc;
    variant.attributes.forEach(({ attribute, value }) => {
      const currentAttribute = attrs[attribute];
      if (!currentAttribute) {
        attrs[attribute] = [value];
        return;
      }

      const valueExists = currentAttribute.find((str) => str === value);
      if (!valueExists) {
        attrs[attribute].push(value);
      }
    });

    return attrs;
  }, {});
}

function attributesToObject({ attributes }) {
  return Object.assign(
    {},
    ...attributes.map(({ attribute, value }) => ({ [attribute]: value }))
  );
}

export const VariantSelector = ({
  variants,
  selectedVariant,
  onVariantChange,
}) => {
  const attributes = reduceAttributes(variants);

  function onAttributeSelect({ attribute, value, e }) {
    const selectedAttributes = attributesToObject(selectedVariant);

    selectedAttributes[attribute] = value;
    // Get the most suitable variant
    let variant = variants.find((variant) => {
      if (isEqual(selectedAttributes, attributesToObject(variant))) {
        return true;
      }
      return false;
    });

    if (variant) {
      onVariantChange(variant);
    }
  }

  return (
    <div>
      {Object.keys(attributes).map((attribute) => {
        const attr = attributes[attribute];
        const selectedAttr = selectedVariant.attributes.find(
          (a) => a.attribute === attribute
        );

        if (!selectedAttr) {
          return null;
        }

        return (
          <div key={attribute} className="mt-10">
            <div>
              <h3 className="text-sm text-gray-900 font-medium">{attribute}</h3>
            </div>

            <div className="flex justify-between mb-5">
              {attr.map((value) => (
                <button
                  key={value}
                  onClick={(e) =>
                    onAttributeSelect({
                      attribute,
                      value,
                      e,
                    })
                  }
                  type="button"
                  className="m-1 bg-white shadow-sm text-gray-900 cursor-pointer group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none flex-1"
                  style={{
                    border:
                      value === selectedAttr.value
                        ? "2px solid rgb(99 102 241)"
                        : "1px solid rgb(197 222 221)",
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};