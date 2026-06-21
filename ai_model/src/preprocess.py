import os
import pandas as pd
import shutil
# 1. Paths
# Update this if your subfolders are deeper inside 'archive'
source_root = "../data/NormalAbnormalHeartSounds"
output_root = "../data/Normal_Abnormal_Labeled"

# Create target directories on the local Colab instance
os.makedirs(os.path.join(output_root, "Normal"), exist_ok=True)
os.makedirs(os.path.join(output_root, "Abnormal"), exist_ok=True)

# 2. Stats tracker
stats = {"Normal": 0, "Abnormal": 0, "Errors": 0}

print("Searching for REFERENCE.csv files...")

# 3. Walk through all subdirectories in the archive
for root, dirs, files in os.walk(source_root):
    # Look for the reference file (case insensitive)
    ref_file = next((f for f in files if f.lower() == "reference.csv"), None)

    if ref_file:
        csv_path = os.path.join(root, ref_file)
        print(f"Processing folder: {os.path.basename(root)}")

        try:
            # Load CSV (No header: Col 0 is filename, Col 1 is label)
            df = pd.read_csv(csv_path, header=None)

            for _, row in df.iterrows():
                file_id = str(row[0])
                label_code = int(row[1])

                filename = f"{file_id}.wav"
                src_file_path = os.path.join(root, filename)

                # Mapping: -1 or 0 is Normal, 1 is Abnormal
                if label_code == 1:
                    label_name = "Abnormal"
                else:
                    label_name = "Normal"

                dest_file_path = os.path.join(output_root, label_name, filename)

                # Check if .wav exists and copy
                if os.path.exists(src_file_path):
                    shutil.copy(src_file_path, dest_file_path)
                    stats[label_name] += 1
                else:
                    # Sometimes files are .hea or .dat, we only want .wav
                    pass

        except Exception as e:
            print(f"Error processing {csv_path}: {e}")
            stats["Errors"] += 1

print("\n--- Processing Finished ---")
print(f"Total Normal: {stats['Normal']}")
print(f"Total Abnormal: {stats['Abnormal']}")
print(f"Folders with Errors: {stats['Errors']}")