import { useParams, useNavigate } from 'react-router-dom';
import { Image as ImageIcon } from '@phosphor-icons/react';
import Header from '../../components/Header/Header';
import Badge from '../../components/Badge/Badge';
import productsData from '../../data/products.json';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = productsData.find(p => p.id === id);
  if (!product) {
    navigate('/catalogue');
    return null;
  }

  return (
    <div className={styles.screen}>
      <Header title={product.name} showBack />

      <div className={styles.body}>
        {/* Image */}
        <div className={styles.imageArea}>
          <ImageIcon weight="light" size={48} color="var(--color-text-secondary)" />
        </div>

        <div className={styles.divider} />

        {/* Price + badges */}
        <div className={styles.topInfo}>
          <div className={styles.badges}>
            <Badge variant={product.type} />
            {product.hasFlashcard && <Badge variant="fc" />}
          </div>
          <span className={styles.price}>{product.price}</span>
          <Badge variant={product.stockStatus} />
        </div>

        <div className={styles.divider} />

        {/* Details */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Details</span>
          <div className={styles.detailRows}>
            {product.material && (
              <div className={styles.detailRow}>
                <span className={styles.detailKey}>Material</span>
                <span className={styles.detailVal}>{product.material}</span>
              </div>
            )}
            {product.dimensions && (
              <div className={styles.detailRow}>
                <span className={styles.detailKey}>Dimensions</span>
                <span className={styles.detailVal}>{product.dimensions}</span>
              </div>
            )}
            {product.origin && (
              <div className={styles.detailRow}>
                <span className={styles.detailKey}>Origin</span>
                <span className={styles.detailVal}>{product.origin}</span>
              </div>
            )}
            {product.variants && product.variants.length > 0 && (
              <div className={styles.detailRow}>
                <span className={styles.detailKey}>Variants</span>
                <span className={styles.detailVal}>{product.variants.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {product.careInstructions && (
          <>
            <div className={styles.divider} />
            <div className={styles.section}>
              <span className={styles.sectionLabel}>Care</span>
              <p className={styles.careText}>{product.careInstructions}</p>
            </div>
          </>
        )}

        {product.flashcardNotes && (
          <>
            <div className={styles.divider} />
            <div className={styles.section}>
              <span className={styles.sectionLabel}>Sales notes</span>
              <p className={styles.careText}>{product.flashcardNotes}</p>
            </div>
          </>
        )}

        {product.relatedSOPId && (
          <>
            <div className={styles.divider} />
            <div className={styles.section}>
              <button
                className={styles.sopLink}
                onClick={() => navigate(`/sop/${product.relatedSOPId}`)}
              >
                View related SOP →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
