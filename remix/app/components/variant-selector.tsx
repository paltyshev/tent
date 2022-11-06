import isEqual from "lodash/isEqual";

function reduceAttributes(variants: any) {
  return variants.reduce((acc: any, variant: any) => {
    const attrs = acc;
    variant?.attributes?.forEach(({ attribute, value }: { attribute: string; value: string }) => {
      const currentAttribute = attrs[attribute];
      if (!currentAttribute) {
        attrs[attribute] = [value];
        return;
      }

      const valueExists = currentAttribute.find((str: string) => str === value);
      if (!valueExists) {
        attrs[attribute].push(value);
      }
    });

    return attrs;
  }, {});
}

function attributesToObject({ attributes }: { attributes: any }) {
  return Object.assign(
    {},
    ...attributes.map(({ attribute, value }: { attribute: string; value: string }) => ({ [attribute]: value })),
  );
}

export const VariantSelector = ({
  variants,
  selectedVariant,
  onVariantChange,
}: {
  variants: any;
  selectedVariant: any;
  onVariantChange: Function;
}) => {
  const attributes = reduceAttributes(variants);

  function onAttributeSelect({ attribute, value }: { attribute: string; value: string }) {
    const selectedAttributes = attributesToObject(typeof(selectedVariant.attributes) == "undefined" ? variants[0] : selectedVariant);

    selectedAttributes[attribute] = value;
    // Get the most suitable variant
    let variant = variants?.find((variant: any) => {
      if (isEqual(selectedAttributes, attributesToObject(variant))) {
        return true;
      }
      return false;
    });

    if (!variant) {
      variant = variants.find((variant: any) =>
        variant.attributes.some((a: any) => a.attribute === attribute && a.value === value),
      );
    }

    onVariantChange(variant);
  }

  return (
    <div>
      {Object.keys(attributes).map((attribute) => {
        const attr = attributes[attribute];
        //if (typeof(selectedVariant.attributes) == 'undefined') return null;
        const selectedAttr = (typeof(selectedVariant.attributes) == "undefined" ? variants[0].attributes : selectedVariant.attributes).find(
          (a) => a.attribute === attribute
        );

        return (
          <div key={attribute} className="mt-10">
            <div>
              <h3 className="text-sm font-medium">{attribute}</h3>
            </div>

            <div className="grid gap-2 grid-cols-2 mb-5">
              {attr.map((value) => (
                <button
                  key={value}
                  onClick={(e) =>
                    onAttributeSelect({
                      attribute,
                      value
                    })
                  }
                  type="button"
                  className="btn btn-outline btn-primary w-full"
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